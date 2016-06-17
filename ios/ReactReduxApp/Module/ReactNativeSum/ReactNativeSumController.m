//
//  ReactNativeSumController.m
//  ReactReduxApp
//
//  Created by sihuan on 16/6/17.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ReactNativeSumController.h"
#import "RCTRootView.h"

@interface ReactNativeSumController ()

@property (nonatomic, weak) RCTRootView *reactRootView;

@end

@implementation ReactNativeSumController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.edgesForExtendedLayout = UIRectEdgeNone;
  [self useLocalBundle];
}

- (void)viewDidLayoutSubviews {
  _reactRootView.frame = self.view.bounds;
}

- (void)useLocalBundle {
  NSString *ip = @"localhost";
  //    NSString *ip = @"192.168.2.36";
  NSURL *jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://%@:8081/helloWorld.bundle?platform=ios&dev=true", ip]];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"app"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.frame = self.view.bounds;
  
  [self.view addSubview:rootView];
  _reactRootView = rootView;
}

@end
