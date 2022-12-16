import classes from './MainLayout.module.scss';

interface ILayout {
  children: React.ReactNode;
}
export const MainLayout: React.FC<ILayout> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};
