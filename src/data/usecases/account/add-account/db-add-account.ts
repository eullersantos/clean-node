import { LoadAccountByEmailRepository } from '@/data/usecases/account/authentication/db-authentication-protocols'
import {
  Hasher,
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository
} from './db-add-accoun-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add({
        ...accountData,
        password: hashedPassword
      })

      return newAccount
    }

    return null
  }
}
