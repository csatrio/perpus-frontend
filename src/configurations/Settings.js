export default class Settings{
    DEBUG = (process.env.NODE_ENV === 'production' ? true : false) || true;
    itemPerPage = 5;
    itemPerPageOptions = [1, 2, 3, 4, 5, 10, 20]
    AlertDismissTimeout = 5000
}
