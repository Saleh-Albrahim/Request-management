import { Button } from '@chakra-ui/react';

const buttonStyle: any = {
  height: '60px',
  width: '240px',
  fontSize: '20px',
  backgroundColor: '#F0F0F0',
  borderColor: '#F0F0F0',
  borderRadius: '5px',
  boxShadow: 'base',
  _hover: { color: 'black', boxShadow: 'lg' },
};

interface Props {
  updateScene: (value: string) => void;
  value: string;
  currentScene: string;
}

const SideBarItem = ({ updateScene, currentScene, value }: Props) => {
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
    <Button {...selected} {...buttonStyle} onClick={(e: any) => updateScene(e.target.innerText)}>
      {value}
    </Button>
  );
};

export default SideBarItem;
