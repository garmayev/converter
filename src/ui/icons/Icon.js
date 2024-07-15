import News from './News';
import Megaphone from './Megaphone';

export default function Icon({name, props}) {
    switch (name.toLowerCase()) {
        case 'news':
            return <News {...props}></News>
        case 'megaphone':
            return <Megaphone {...props}></Megaphone>
    }
}
