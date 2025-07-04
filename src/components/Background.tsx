import { Iridescence } from '@appletosolutions/reactbits';
import { useTheme } from '../useTheme';

const Background = () => {
const { theme } = useTheme();
const iridescenceColor: [number, number, number] = theme === 'light' ? [0.5, 1, 1] : [0.2, 0.6, 1];

return (
    <div className="fixed inset-0 z-0">
    <Iridescence
        color={iridescenceColor}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
    />
    </div>
);
};

export default Background;