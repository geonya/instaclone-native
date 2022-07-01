import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, { cache, isLoggedInVar, tokenVar } from './apollo';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, CachePersistor } from 'apollo3-cache-persist';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

export default function App() {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	const [appIsReady, setAppIsReady] = useState(false);
	const preLoadAssets = () => {
		const fontsToLoad = [Ionicons.font];
		const fontPromises = fontsToLoad.map((font: any) => Font.loadAsync(font));
		const imagesToLoad = [require('./assets/instagram.png')];
		const imagePromises = imagesToLoad.map((image: any) =>
			Asset.loadAsync(image)
		);
		Promise.all([...fontPromises, ...imagePromises]);
	};
	useEffect(() => {
		const preLoad = async () => {
			const token = await AsyncStorage.getItem('token');
			const cachePersistor = new CachePersistor({
				cache,
				storage: new AsyncStorageWrapper(AsyncStorage),
			});
			if (token) {
				isLoggedInVar(true);
				tokenVar(token);
			}
			try {
				await SplashScreen.preventAutoHideAsync();
				preLoadAssets();
				await cachePersistor.restore();
				// purge() 시 저장된 cache 모두 삭제
			} catch (err) {
				console.error(err);
			} finally {
				setAppIsReady(true);
			}
		};
		preLoad();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);
	if (!appIsReady) {
		return null;
	}
	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<ApolloProvider client={client}>
				<NavigationContainer>
					{isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
				</NavigationContainer>
			</ApolloProvider>
		</View>
	);
}
