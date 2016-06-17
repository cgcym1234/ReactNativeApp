//
//  ExportManager.m
//  ReactNativeWay
//
//  Created by chester on 15/11/18.
//  Copyright © 2015年 chester. All rights reserved.
//

#import "ExportManager.h"
#import <RCTLog.h>

@implementation ExportManager

RCT_EXPORT_MODULE();

/**
 *  js中onItemClicked点击事件的统一回掉
 */
RCT_EXPORT_METHOD(didClickedItemWithUrlString:(NSString *)urlString)
{
  RCTLogInfo(@"URL String = %@", urlString);
  dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName:Notify_DidClickedItemWithUrlString object:urlString];
  });
  
}

@end
