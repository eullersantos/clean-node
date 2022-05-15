import { LoadAccountByTokenRepository } from '../../../data/protocols/db/account/load-account-by-token-repository'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { AccountModel } from '../add-account/db-add-accoun-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (accessToken) {
      console.log(accessToken, role)
      await this.loadAccountByTokenRepository.loadByToken(token, role)
    }
    return null
  }
}