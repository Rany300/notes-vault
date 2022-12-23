export type NavigationProp = {
    name: string;
    path: string;
    viewable: 'always' | 'logged-in' | 'logged-out',
    action?: () => void;
}