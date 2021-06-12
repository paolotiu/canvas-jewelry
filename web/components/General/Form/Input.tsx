import styled from '@emotion/styled';

const Input = styled.input`
  border-radius: ${({ theme }) => theme.borderRadius.none};
  padding: 0.5em 1em;
  border: 1px solid ${({ theme }) => theme.colors.gray}; ;
`;
export default Input;
