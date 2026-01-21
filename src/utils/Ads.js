import RNStartIoAds, { Types, BannerAd } from 'react-native-startio-ads';

const APP_ID = '200441720';

const AdsManager = {
    init: (testMode = false) => {
        RNStartIoAds.initialize({
            appId: APP_ID,
            testAds: testMode,
        });
        console.log('[AdsManager] Initialized with App ID:', APP_ID);
    },

    loadInterstitial: (type = Types.INTERSTITIAL) => {
        return RNStartIoAds.loadInterstitial(type);
    },

    showInterstitial: async () => {
        try {
            await RNStartIoAds.showInterstitial();
        } catch (error) {
            console.warn('[AdsManager] Error showing Interstitial:', error);
        }
    },

    loadRewarded: () => {
        return RNStartIoAds.loadRewarded();
    },

    showRewarded: async () => {
        try {
            await RNStartIoAds.showRewarded();
        } catch (error) {
            console.warn('[AdsManager] Error showing Rewarded:', error);
        }
    },

    addRewardListener: (callback) => {
        return RNStartIoAds.addListener('rewarded', callback);
    },

    removeAllListeners: () => {
        RNStartIoAds.removeAllListeners();
    }
};

export { AdsManager, BannerAd, Types };
export default AdsManager;
