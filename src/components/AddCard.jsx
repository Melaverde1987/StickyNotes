import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { IoMdAdd } from 'react-icons/io';

export const AddCard = ({ addCard }) => {
  return (
    <AddCardContainer>
      <Formik
        initialValues={{
          title: '',
          completed: false,
        }}
        onSubmit={(values, actions) => {
          console.log('values', values);
          addCard(values);
          actions.resetForm();
        }}
      >
        <Form>
          <div>
            <Field type="hidden" name="title" />
          </div>

          <div>
            <Field type="hidden" name="completed" />
          </div>

          <AddButton type="submit">
            <IoMdAdd />
          </AddButton>
        </Form>
      </Formik>
    </AddCardContainer>
  );
};

const AddCardContainer = styled.div`
  //border: 2px dashed gray;
  height: fit-content;
  width: fit-content;
  padding-bottom: 20px;
`;

const AddButton = styled.button`
  /*
  padding: 20px;
  min-width: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
    */

  --i: var(--light, 0);
  --not-i: calc(1 - var(--i));
  --j: var(--press, 0);
  --not-j: calc(1 - var(--j));
  z-index: var(--i);
  border: none;
  line-height: 0;
  width: 2em;
  height: 2em;
  border-radius: 15%;
  transform: scale(calc(1 - var(--j) * 0.02));
  box-shadow:
    calc(var(--not-j) * -0.25em) calc(var(--not-j) * -0.25em) 0.25em
      rgba(252, 252, 252, var(--not-j)),
    calc(var(--not-j) * 0.25em) calc(var(--not-j) * 0.25em) 0.25em
      rgba(210, 218, 230, var(--not-j)),
    inset calc(var(--j) * 0.25em) calc(var(--j) * 0.25em) 0.25em
      rgba(210, 218, 230, var(--j)),
    inset calc(var(--j) * -0.25em) calc(var(--j) * -0.25em) 0.25em
      rgba(252, 252, 252, var(--j));
  background: #e8e8e8;
  font-size: 2.5em;
  transition:
    box-shadow 0.3s,
    transform 0.3s cubic-bezier(0.2, 4, 1, 3);

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    --light: 1;

    svg {
      color: gray;
    }
  }

  &:active {
    --press: 1;
  }

  svg {
    color: darkgrey;
    transition: all 300ms;
  }
`;
