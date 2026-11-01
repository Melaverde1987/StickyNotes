import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';

const COLORS = [
  'lightgreen',
  'lightpink',
  'orange',
  'gold',
  'lightskyblue',
  'mediumslateblue',
  'snow',
  'turquoise',
  'chartreuse',
];

export const EditForm = ({ card, setEditingCardId, editCard }) => {
  const onEditSubmit = async values => {
    try {
      const texts = values.items
        .split('\n')
        .map(text => text.trim())
        .filter(Boolean);

      const updatedTask = {
        color: values.color,
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
        color: card.color ?? 'lightgreen',
        title: card.title ?? '',
        items: (card.items ?? []).map(item => item.text).join('\n'),
      }}
      onSubmit={values => onEditSubmit(values)}
      onReset={() => setEditingCardId(null)}
    >
      <Form>
        <div>
          <GroupLabel id="color-label">Card color</GroupLabel>
          <ColorGroup role="group" aria-labelledby="color-label">
            {COLORS.map(color => (
              <ColorLabel key={color}>
                <Field
                  type="radio"
                  name="color"
                  value={color}
                  aria-label={color}
                />
                <ColorSwatch $color={color} aria-hidden="true" />
              </ColorLabel>
            ))}
          </ColorGroup>
        </div>
        <div>
          <Field type="text" name="title" placeholder="title" />
        </div>

        <div>
          <Field as="textarea" name="items" placeholder="add tasks" rows={6} />
        </div>
        <BtnHolder>
          <Btn type="submit">Save</Btn>
          <Btn type="reset">Cancel</Btn>
        </BtnHolder>
      </Form>
    </Formik>
  );
};

const GroupLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 18px;
  font-weight: 600;
  color: #232121;
`;

const ColorGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-block: 12px;
`;

const ColorLabel = styled.label`
  position: relative;
  display: inline-flex;
  cursor: pointer;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    opacity: 0;
  }

  input:checked + span {
    outline: 2px solid midnightblue;
    outline-offset: 4px;
  }

  input:focus-visible + span {
    outline: 3px dashed midnightblue;
    outline-offset: 4px;
  }

  &:hover span {
    transform: scale(1.08);
  }
`;

const ColorSwatch = styled.span`
  display: block;
  width: 26px;
  height: 26px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  transition: transform 0.2s;
`;

const BtnHolder = styled.div`
  display: flex;
  gap: 6px;
`;

const Btn = styled.button`
  padding: 10px 18px;
  font-size: 18px;
  position: relative;
  font-weight: 600;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.secondary};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.text};
    z-index: -1;
    transition: all 0.3s;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover::before {
    height: 100%;
  }
`;
