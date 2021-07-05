import { ReactNode } from 'react';
import MenuNavigator from './AppBar';
import { useLayout } from './useLayout';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { classes } = useLayout();

  return (
    <div className={classes.root}>
      <MenuNavigator />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
