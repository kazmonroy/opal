interface ListWrapperProps {
  children: React.ReactNode;
}
function ListWrapper({ children }: ListWrapperProps) {
  return <li className='shrink-0 h-full w-[17rem] select-none'>{children}</li>;
}

export default ListWrapper;
