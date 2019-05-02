import Settings from './Settings'

let _settings = null;
const GetInstance = () => {
    if (_settings === null) _settings = new Settings();
    return _settings
};

export default GetInstance()
