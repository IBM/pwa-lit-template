import type { Route as RouteBase } from '@vaadin/router';

interface RouteIcon {
  icon?: string;
}

interface RouteLabel {
  label?: string;
}

interface RouteNavigation {
  show_in_nav?: boolean;
}

type Route = RouteNavigation | RouteLabel | RouteIcon | RouteBase;

export default Route;
