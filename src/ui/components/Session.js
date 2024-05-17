import EncryptedStorage from 'react-native-encrypted-storage';


async function getItem(key) {
    try {
        const session = await EncryptedStorage.getItem(key);

        if (session !== undefined) {
            return session
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}

async function setItem(key, value) {
    try {
        const session = await EncryptedStorage.setItem(key, value);

        if (session !== undefined) {
            return session
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}

async function removeItem(key) {
    try {
        const session = await EncryptedStorage.removeItem(key);

        if (session !== undefined) {
            return session
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}

export default function Session() {
    return {
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem
    }
}
