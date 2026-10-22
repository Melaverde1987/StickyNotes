import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';

export const EditForm = ({ card, setEditingCardId, editCard }) => {
  const onEditSubmit = async values => {
    try {
      const texts = values.items
        .split('\n')
        .map(text => text.trim())
        .filter(Boolean);

      const updatedTask = {
        title: values.title,
        items: texts.map((text, index) => ({
          ...card.items?.[index],
          id: card.items?.[index]?.id ?? crypto.randomUUID(),
          text,
          completed: card.items?.[index]?.completed ?? false,
        })),
      };

      const saved = await editCard(card.id, updatedTask);

      if (saved) {
        setEditingCardId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: card.title ?? '',
        items: (card.items ?? []).map(item => item.text).join('\n'),
      }}
      onSubmit={values => onEditSubmit(values)}
      onReset={() => setEditingCardId(null)}
    >
      <Form>
        <div>
          <Field type="text" name="title" placeholder="title" />
        </div>

        <div>
          <Field as="textarea" name="items" placeholder="add tasks" rows={6} />
        </div>

        <Btn type="submit">Save</Btn>
        <Btn type="reset">Cancel</Btn>
      </Form>
    </Formik>
  );
};

const Btn = styled.button`
  padding: 10px 12px;
  font-size: 18px;

  position: relative;
  font-weight: 600;
  background-color: transparent;
  border: none;
  outline: none;
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  overflow: hidden;
  z-index: 1;
  border-radius: 5px;
  padding: 13px 25px;
  box-sizing: border-box;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background-color: white;
    z-index: -1;
    transition: all 0.3s;
    box-sizing: border-box;
  }

  &:hover::before {
    height: 100%;
  }
`;
