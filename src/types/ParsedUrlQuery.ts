import { NextRouter } from 'next/router';

/**
 * Коллекция параметров, передаваемых в адресе страницы.
 */
type ParsedUrlQuery = NextRouter['query'];

export default ParsedUrlQuery;
