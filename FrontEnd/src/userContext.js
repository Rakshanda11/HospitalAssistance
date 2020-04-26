import React from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
    state = {
        user: null
    }

    setUser = newUser => {
        console.log("NEW USER")
        console.log(newUser)
        this.setState({
            user: newUser
        })
    }

    render() {
        const { children } = this.props
        const { user } = this.state
        const { setUser } = this

        return (
            <UserContext.Provider
                value={{
                    user,
                    setUser
                }}
            >
                {children}
            </UserContext.Provider>
        )
    }
}


// export const UserProvider = UserContext.Provider
// export const UserConsumer = UserContext.Consumer

export default UserContext;
export { UserProvider };
