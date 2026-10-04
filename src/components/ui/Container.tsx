import type { ComponentType, ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
};

type ContainerComponentProps = { id?: string; className?: string; children?: ReactNode } & Record<
  string,
  unknown
>;

export function Container({ children, className = "", as: Tag = "div", id }: ContainerProps) {
  const Component = Tag as unknown as ComponentType<ContainerComponentProps>;
  return (
    <Component
      id={id}
      className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}
    >
      {children}
    </Component>
  );
}