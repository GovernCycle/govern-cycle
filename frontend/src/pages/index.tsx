import React, { useState, useEffect } from 'react';
import type { Principal } from '@dfinity/principal';
import { useCandidActor, useAuth } from '@bundly/ares-react';
import { CandidActors } from '@app/canisters';
import Header from '@app/components/header';
import type {User, UserRequest, AuthenticationResult, State, Role, Jurisdiction } from '@app/declarations/home/home.did';



export default function IcConnectPage() {
  const { isAuthenticated, currentIdentity } = useAuth();
  const [profiles, setProfiles] = useState<Array<[Principal, User]>>([]);

  // const { userPrincipal, setUserPrincipal } = useAuth();
  const [profile, setProfile] = useState<AuthenticationResult | undefined>();
  const [loading, setLoading] = useState(false); // State for loader
  const test = useCandidActor<CandidActors>("home", currentIdentity, {
    canisterId: process.env.NEXT_PUBLIC_HOME_CANISTER_ID!,
  }) as CandidActors["home"];

  

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  }, [currentIdentity]);

  async function getProfile() {
    try {
      setLoading(true);
      const response = await test.getProfile();
      setProfile(response);
      setLoading(false);
    } catch (error) {
      console.error({ error });
      setLoading(false);
    }
  }


  async function createUser() {
    try {
      setLoading(true);
      const newUser: UserRequest = {
        'manager': ["Manager Name"],
        'logo': new Uint8Array([123]),
        'name': "User Name",
        'role': [{ TechnicalExpert: null }],
        'email': "user@example.com",
        'jurisdiction': [
          {
            'region': ["North America"],
            'country': ["United States"],
            'continent': ["America"],
          },
        ],
        'phone': "1234567890",
      };

      const response = await test.createProfile(newUser);
      console.log("User created", response);
      setLoading(false);
    } catch (error) {
      console.error({ error });
      setLoading(false);
    }
  }

  async function changeUserState(newState: State, userPrincipal: Principal) {
    try {
      setLoading(true);
      const response = await test.changeUserState(newState, userPrincipal);
      console.log("User state changed", response);
      setLoading(false);
    } catch (error) {
      console.error({ error });
      setLoading(false);
    }
  }

  async function deleteUser(userPrincipal: Principal) {
    try {
      setLoading(true);
      const response = await test.deleteUser(userPrincipal);
      console.log("User deleted", response);
      setLoading(false);
    } catch (error) {
      console.error({ error });
      setLoading(false);
    }
  }

  async function getAllProfiles() {
    try {
      setLoading(true);
      const profiles = await test.getAllProfiles();
      console.log("All profiles", profiles);
      setProfiles(profiles);  // Set profiles to state
      setLoading(false);
    } catch (error) {
      console.error({ error });
      setLoading(false);
    }
  }

  return (
    <>

      <main className="p-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">Profile</h2>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={createUser}
                disabled={loading}
              >
                {loading ? "Creating User..." : "Create User"}
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={getAllProfiles}
                disabled={loading}
              >
                {loading ? "Fetching Profiles..." : "Get All Profiles"}
              </button>
              <div className="profile-list mt-4">
                {profiles.map(([principal, user], index) => (
                  <div key={index} className=" profile-card border p-4 mb-4 rounded  ">
                    <div className="profile-field">
                      <label className="profile-label">Principal:</label>
                      <span className="profile-value">{principal.toText()}</span>
                    </div>
                    <div className="profile-field">
                      <label className="profile-label">Email:</label>
                      <span className="profile-value">{user.email}</span>
                    </div>
                    <div className="profile-field">
                      <label className="profile-label">Name:</label>
                      <span className="profile-value">{user.name}</span>
                    </div>
                    <div className="profile-field">
                      <label className="profile-label">Phone:</label>
                      <span className="profile-value">{user.phone}</span>
                    </div>
                    <div className="profile-field ">
                      <label className="profile-label">Role:</label>
                      <span className="profile-value">{user.role.map(role => Object.keys(role)[0]).join(", ")}</span>
                    </div>
                    <div className="profile-field ">
                      <label className="profile-label">State:</label>
                      <span className="profile-value">{Object.keys(user.state)[0]}</span>
                    </div>
                    <div className="profile-field ">
                      <label className="profile-label">Jurisdiction:</label>
                      <span className="profile-value">
                        {user.jurisdiction.map(j => `${j.continent[0]} - ${j.country[0]} - ${j.region[0]}`).join(", ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={deleteUser()}
                disabled={loading}
              >
                {loading ? "Fetching Profiles..." : "Get All Profiles"}
              </button> */}
              {/* Additional UI elements for displaying profiles, changing state, and deleting users */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
