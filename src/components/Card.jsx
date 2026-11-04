import { useState } from 'react';
import { styled } from 'styled-components';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { Item } from 'components/Item';
import { EditForm } from 'components/EditForm';

export const Card = ({ editCard, deleteCard, toggleItemCompleted, card }) => {
  const [editingCardId, setEditingCardId] = useState(null);

  const editTaskBtn = id => {
    setEditingCardId(id);
  };

  return (
    <CardContainer $color={card.color}>
      <ButtonsHolder>
        <BtnEdit type="button" onClick={() => editTaskBtn(card.id)}>
          <FiEdit2 />
        </BtnEdit>
        <BtnDelete type="button" onClick={() => deleteCard(card.id)}>
          <MdDeleteOutline />
        </BtnDelete>
      </ButtonsHolder>

      {editingCardId === card.id ? (
        <EditForm
          card={card}
          editCard={editCard}
          setEditingCardId={setEditingCardId}
        />
      ) : (
        <>
          {card.title}
          {card.items.length > 0 && (
            <ItemsList>
              {card.items.map(item => (
                <Item
                  key={item.id}
                  completed={item.completed}
                  card={card}
                  itemId={item.id}
                  onClick={toggleItemCompleted}
                >
                  {item.text}
                </Item>
              ))}
            </ItemsList>
          )}
        </>
      )}
    </CardContainer>
  );
};

const BtnEdit = styled.button`
  padding: 10px 6px;
  line-height: 0;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const BtnDelete = styled.button`
  padding: 10px 6px;
  line-height: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const CardContainer = styled.div`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.fonts.secondary500};
  --levitate: 0;
  padding: 30px;
  background-color: ${({ theme }) => theme.fonts.primary500};
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s;
  background-color: ${({ $color, theme }) => $color || theme.colors.primary500};

  @media (hover: hover) and (pointer: fine) {
    ${BtnEdit},
    ${BtnDelete} {
      visibility: hidden;
    }

    &:hover,
    &:focus-within,
    &:focus-visible {
      ${BtnEdit},
      ${BtnDelete} {
        visibility: visible;
      }
    }
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: all 0.3s;
    height: calc(100% - 2px);
    background-color: rgba(0, 0, 0, 0.4);
    z-index: -1;
    transform-origin: bottom left;
    transform: translate3d(8px, 2px, -1px) rotate(1deg);
    filter: blur(2px);
  }

  &:after {
    content: '';
    pointer-events: none;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
    mix-blend-mode: overlay;
    background-image: linear-gradient(to left, #ffe4b2, #c8b188);
  }

  &:hover {
    --levitate: 1;

    &:before {
      transform: translate3d(6rem, 1rem, -1px)
        scale(calc(1 - var(--levitate) * 0.1)) rotate(1.5deg);
      filter: blur(8px);
    }

    &:after {
      opacity: 0.6;
    }
  }
`;

const ItemsList = styled.ul`
  list-style: none;
  margin: 0;
  font-size: 0.9em;
  padding-left: 14px;
`;

const ButtonsHolder = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
