import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgetPassword, NewPassword, OTP, SignIn, SignUp, SignUpComplete } from '../../screens';


const AuthLayout = () => {

    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator initialRouteName="sign-in">
            <Stack.Screen name="sign-in" options={{ headerShown: false }} component={SignIn} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} component={SignUp} />
            <Stack.Screen name="forget-password" options={{
                headerShown: false,
            }} component={ForgetPassword} />

            <Stack.Screen name="otp" options={{
                headerShown: false,
            }} component={OTP} />
            <Stack.Screen name="new-password" options={{
                headerShown: false,
            }} component={NewPassword} />
            <Stack.Screen name="sign-up-completed" options={{
                headerShown: false,
            }} component={SignUpComplete} />

        </Stack.Navigator>
    );
};

export default AuthLayout;
