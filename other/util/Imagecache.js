/**
 * Created by chesterlee on 16/4/26.
 */

'use strict';


import React, {
    NativeModules
} from 'react-native';

// 获取图片缓冲大小
export function ImageCacheSize(callback) {
    NativeModules.ImageLoader.ImageCacheSize(function (imageCacheSize) {
        callback(imageCacheSize)
    })
}

// 删除缓冲
export function CleanImageCache(completeCallback) {
    NativeModules.ImageLoader.CleanImageCache(function () {
        if (completeCallback) {
            completeCallback();
        }
    })
}


