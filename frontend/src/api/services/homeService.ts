import type { Principal } from '@dfinity/principal';
import type { _SERVICE, UserRequest, AuthenticationResult, State, User } from '../../declarations/home/home.did';
import { HomeActor } from '@app/canisters/home';


export class HomeAPI {
  private actor: HomeActor;

  constructor(actor: HomeActor) {
    this.actor = actor;
  }

  // Cambiar el estado de un usuario
  public async changeUserState(state: State, userPrincipal: Principal): Promise<AuthenticationResult> {
    try {
      const result = await this.actor.changeUserState(state, userPrincipal);
      return result;
    } catch (error) {
      console.error('Error changing user state:', error);
      throw error;
    }
  }

  // Crear un perfil de usuario
  public async createProfile(userRequest: UserRequest): Promise<AuthenticationResult> {
    try {
      const result = await this.actor.createProfile(userRequest);
      return result;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  // Eliminar un usuario
  public async deleteUser(userPrincipal: Principal): Promise<AuthenticationResult> {
    try {
      const result = await this.actor.deleteUser(userPrincipal);
      return result;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Obtener todos los perfiles
  public async getAllProfiles(): Promise<Array<[Principal, User]>> {
    try {
      const result = await this.actor.getAllProfiles();
      return result;
    } catch (error) {
      console.error('Error getting all profiles:', error);
      throw error;
    }
  }

  // Obtener un perfil específico
  public async getProfile(): Promise<AuthenticationResult> {
    try {
      const result = await this.actor.getProfile();
      return result;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  }

  // Estado de la creación del perfil
  public async getProfileCreationStatus(): Promise<any> { // Ajusta el tipo de retorno si tienes más detalles
    try {
      const result = await this.actor.getProfilecreaitonstatus();
      return result;
    } catch (error) {
      console.error('Error getting profile creation status:', error);
      throw error;
    }
  }
}
