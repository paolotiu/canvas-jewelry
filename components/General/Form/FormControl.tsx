import styled from '@emotion/styled';

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;

  label {
    padding-bottom: 5px;
    color: ${({ theme }) => theme.colors.coolGray[600]};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  }
`;
export default FormControl;
