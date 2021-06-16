import RpcErrorCode from 'consts/RpcErrorCode';
import RpcError from 'errors/RpcError';

/**
 * Указывает, что
 */
export default class RpcHelper {
  /**
   * Возвращает `true`, если данная ошибка является исключением RPC API и имеет
   * переданный код.
   * @param error Ошибка.
   * @param code Код ошибки RPC.
   */
  public static isError(error: Error, code: RpcErrorCode) {
    return error instanceof RpcError && error.code === code;
  }
}
