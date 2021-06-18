/**
 * Ключ в localStorage.
 */
enum StorageKey {
  /**
   * Содержит токен для продления токена авторизации в RPC API.
   */
  AUTH_TOKEN = 'auth_token',

  /**
   * Телефон, введённый при восстановлении пароля.
   */
  RECOVERY_PHONE = 'recovery_phone',

  /**
   * Код подтверждения, введённый при восстановлении пароля.
   */
  RECOVERY_CODE = 'recovery_code',
}

export default StorageKey;
