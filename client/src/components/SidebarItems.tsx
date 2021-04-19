import { Button } from '@chakra-ui/react';

const buttonStyle: any = {
  height: '60px',
  width: '245px',
  fontSize: '20px',
  backgroundColor: '#F0F0F0',
  borderColor: '#F0F0F0',
  borderRadius: '5px',
  boxShadow: 'md',
  _hover: { borderColor: '#2E2E2E', color: '#2E2E2E' },
};

interface Props {
  changeScene: (value: string) => void;
  value: string;
  currentScene: string;
}

const SideBarItem = ({ changeScene, currentScene, value }: Props) => {
  let selected;
  if (value === currentScene) {
    selected = {
      borderColor: '#2E2E2E',
      color: '#2E2E2E',
      border: '2px solid',
    };
  } else {
    selected = {
      borderColor: 'gray1',
      color: '#595959',
      border: 'none',
    };
  }
  return (
    <Button {...selected} {...buttonStyle} onClick={(e: any) => changeScene(e.target.innerText)}>
      {value}
    </Button>
  );
};

export default SideBarItem;
