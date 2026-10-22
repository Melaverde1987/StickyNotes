import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import styled from 'styled-components';
import { ThreeCircles } from 'react-loader-spinner';
import {
  fetchCards,
  createCard,
  updateCard,
  deleteCardById,
  completeTask,
  saveCardPosition,
} from 'api/api';

import { Card } from 'components/Card';
import { AddCard } from 'components/AddCard';

const COLUMN_IDS = ['column-1', 'column-2', 'column-3'];

export const CardsList = () => {
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCards() {
      setLoading(true);
      try {
        const cards = await fetchCards();
        setAllCards(
          [...cards].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getCards();
  }, []);

  const addCard = async newCard => {
    try {
      setLoading(true);
      const createdTask = await createCard({
        ...newCard,
        items: [],
      });

      setAllCards(prevCards => [...prevCards, createdTask]);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editCard = async (id, updatedTask) => {
    try {
      setLoading(true);
      const savedTask = await updateCard(id, updatedTask);

      setAllCards(prevTasks =>
        prevTasks.map(task => (task.id === id ? savedTask : task))
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async cardId => {
    try {
      setLoading(true);
      const deletedCard = await deleteCardById(cardId);
      setAllCards(prevState =>
        prevState.filter(card => card.id !== deletedCard.id)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItemCompleted = async (card, idTask) => {
    try {
      const updatedCard = await completeTask(card, idTask);

      setAllCards(prevTasks =>
        prevTasks.map(task => (task.id === updatedCard.id ? updatedCard : task))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const columns = Object.fromEntries(
      COLUMN_IDS.map(columnId => [
        columnId,
        allCards.filter(card => (card.columnId ?? 'column-1') === columnId),
      ])
    );

    const [movedCard] = columns[source.droppableId].splice(source.index, 1);

    columns[destination.droppableId].splice(destination.index, 0, movedCard);

    // Column & position
    const updatedCards = COLUMN_IDS.flatMap(columnId =>
      columns[columnId].map((card, index) => ({
        ...card,
        columnId,
        position: index,
      }))
    );

    setAllCards(updatedCards);

    // Save only if changed position
    const changedCards = updatedCards.filter(card => {
      const previousCard = allCards.find(previous => previous.id === card.id);

      return (
        previousCard.columnId !== card.columnId ||
        previousCard.position !== card.position
      );
    });

    try {
      setLoading(true);
      await Promise.all(changedCards.map(saveCardPosition));
    } catch (error) {
      console.log('Position error', error);

      // DB actual
      try {
        const cards = await fetchCards();

        setAllCards(
          [...cards].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        );
      } catch (fetchError) {
        console.log(fetchError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="lightgreen"
          ariaLabel="three-circles-loading"
          wrapperStyle={{
            position: 'absolute',
            zIndex: 10,
            marginInline: 'auto',
            left: 0,
            right: 0,
            width: 'fit-content',
          }}
          wrapperClass=""
        />
      )}
      <AddCard addCard={addCard} />
      <DragDropContext onDragEnd={onDragEnd}>
        <CardsContainer>
          {COLUMN_IDS.map(columnId => (
            <Droppable key={columnId} droppableId={columnId}>
              {provided => (
                <CardsColumn
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {allCards
                    .filter(card => (card.columnId ?? 'column-1') === columnId)
                    .map((card, index) => (
                      <Draggable
                        key={card.id}
                        draggableId={String(card.id)}
                        index={index}
                      >
                        {provided => (
                          <CardHolder
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card
                              editCard={editCard}
                              deleteCard={deleteCard}
                              toggleItemCompleted={toggleItemCompleted}
                              card={card}
                            />
                          </CardHolder>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </CardsColumn>
              )}
            </Droppable>
          ))}
        </CardsContainer>
      </DragDropContext>
    </>
  );
};

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
`;

export const CardsColumn = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  min-height: 200px;
  padding: 16px;
  border: 2px dashed darkgray;
  border-radius: 6px;
`;

const CardHolder = styled.div`
  &:nth-child(3n) {
    transform: translate3d(
        -5px,
        calc(var(--levitate) * -5px),
        calc(var(--levitate) * 3rem)
      )
      rotate(-0.6deg) rotateX(calc(var(--levitate) * 6deg))
      rotateY(calc(var(--levitate) * -3deg));
  }

  &:nth-child(3n-1) {
    transform: translate3d(
        7px,
        calc(var(--levitate) * -5px),
        calc(var(--levitate) * 3rem)
      )
      rotate(-0.5deg) rotateX(calc(var(--levitate) * 6deg))
      rotateY(calc(var(--levitate) * -3deg));
  }

  &:nth-child(3n-2) {
    transform: translate3d(
        0px,
        calc(var(--levitate) * -5px),
        calc(var(--levitate) * 3rem)
      )
      rotate(0.5deg) rotateX(calc(var(--levitate) * 6deg))
      rotateY(calc(var(--levitate) * -3deg));
  }

  &:nth-child(2n) {
    > div {
      background-color: lightskyblue;
    }
  }

  &:nth-child(3n) {
    > div {
      background-color: lightgoldenrodyellow;
    }
  }

  &:nth-child(4n) {
    > div {
      background-color: pink;
    }
  }
`;
