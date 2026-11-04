import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { IoMdAdd } from 'react-icons/io';

export const AddCard = ({ addCard, column }) => {
  return (
    <AddCardContainer>
      <Formik
        initialValues={{
          title: '',
          completed: false,
          columnId: column,
        }}
        onSubmit={(values, actions) => {
          addCard(values);
          actions.resetForm();
        }}
      >
        <Form>
          <AddButton type="submit">
            <IoMdAdd />
          </AddButton>
        </Form>
      </Formik>
    </AddCardContainer>
  );
};

const AddCardContainer = styled.div`
  height: fit-content;
`;

const AddButton = styled.button`
  --i: var(--light, 0);
  --not-i: calc(1 - var(--i));
  --j: var(--press, 0);
  --not-j: calc(1 - var(--j));
  z-index: var(--i);
  line-height: 0;
  width: 100%;
  height: 2em;
  border-radius: 10px;
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
  background: ${({ theme }) => theme.colors.gray500};
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
      color: ${({ theme }) => theme.colors.gray600};
    }
  }

  &:active {
    --press: 1;
  }

  svg {
    color: ${({ theme }) => theme.colors.gray700};
    transition: all 300ms;
  }
`;
