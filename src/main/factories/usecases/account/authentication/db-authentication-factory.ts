import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { Authentication } from '@/domain/usecases/account/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const jwtAdapter = new JwtAdapter('%$Dda3ab*¨#')
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
