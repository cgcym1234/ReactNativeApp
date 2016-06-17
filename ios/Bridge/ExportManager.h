//
//  ExportManager.h
//  ReactNativeWay
//
//  Created by chester on 15/11/18.
//  Copyright © 2015年 chester. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

#define Notify_DidClickedItemWithUrlString @"Notify_DidClickedItemWithUrlString"

/**
 *  用于和js交互
 */
@interface ExportManager : NSObject <RCTBridgeModule>

@end
