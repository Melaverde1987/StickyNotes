import styled, { css } from 'styled-components';

export const Item = ({ completed, card, itemId, onClick, children }) => {
  return (
    <List $completed={completed} onClick={() => onClick(card, itemId)}>
      {children}
    </List>
  );
};

const List = styled.li`
  z-index: 1;
  ${({ $completed }) =>
    $completed === true &&
    css`
      text-decoration: line-through;
    `}

  &:first-letter {
    font-size: 1.4em;
  }
`;
