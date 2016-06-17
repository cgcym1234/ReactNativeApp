//
//  HomeController.m
//  ReactNativeSum
//
//  Created by sihuan on 16/1/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "HomeController.h"
#import "RCTRootView.h"
#import "RCTRootViewDelegate.h"
#import "YYWebViewController.h"
#import "ExportManager.h"

@interface HomeController ()<RCTRootViewDelegate>

@property (nonatomic, weak) RCTRootView *reactRootView;

@end

@implementation HomeController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.edgesForExtendedLayout = UIRectEdgeNone;
  
  //和ReactNative模块的交互
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didClickedItemWithUrlString:) name:Notify_DidClickedItemWithUrlString object:nil];
  [self useLocalBundle];
}

- (void)viewDidLayoutSubviews {
  _reactRootView.frame = self.view.bounds;
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)didClickedItemWithUrlString:(NSNotification *)notify {
  [YYWebViewController pushNewInstanceFromViewController:self withUrlString:notify.object title:nil];
}

/**
 编译错误at process._tickCallback (node.js:359:13)
 
 *  https://github.com/facebook/react-native/issues/4968
 watchman watch-del-all
 npm cache clean && npm install
 
 npm run reset
 node node_modules/react-native/local-cli/cli.js run-ios --reset-cache
 
 Delete the node_modules folder - rm -rf node_modules && npm install
 Reset packager cache - rm -fr $TMPDIR/react-* or node_modules/react-native/packager/packager.sh --reset-cache
 Clear watchman watches - watchman watch-del-all
 Recreate the project from scratch
 
 
 
 Install dependencies
 Babel
 npm install babel-cli babel-core babel-preset-es2015 babel-preset-react --save-dev
 echo '{\n  "presets": ["es2015", "react"]\n}' > .babelrc
 Lots of Babel packages! Let’s run through these quickly:
 
 babel-core: Installs Babel itself for usage by other libraries and apps
 babel-cli: Installs the Babel CLI tool that you can use for compiling, debugging, etc.
 babel-preset-es2015: Installs the plugins available for to compile ES2015 syntax and functionality into ES5.
 babel-preset-react: Installs the plugins available for transforming JSX and Flow syntax/types into ES5. If you don’t know what Flow is, you can completely ignore that extra bit of info.
 I also include a snippet there to create a .babelrc file to load up the es2015 and react plugins. This could also just be done in the webpack config, but then it wouldn’t be available from the CLI so I prefer this method.
 */
- (void)useLocalBundle {
  NSString *ip = @"localhost";
//    NSString *ip = @"192.168.2.36";
  NSURL *jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://%@:8081/home.bundle?platform=ios&dev=true", ip]];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"app"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.delegate = self;
//  rootView.sizeFlexibility = RCTRootViewSizeFlexibilityHeight;
  rootView.frame = self.view.bounds;
  
  [self.view addSubview:rootView];
  _reactRootView = rootView;
}

#pragma mark - RCTRootViewDelegate

- (void)rootViewDidChangeIntrinsicSize:(RCTRootView *)rootView {
//  CGRect newFrame = rootView.frame;
//  newFrame.size = rootView.intrinsicSize;
//  
//  rootView.frame = newFrame;
  NSLog(@"%@", NSStringFromCGSize(rootView.intrinsicSize));
  NSLog(@"%@", rootView);
}


@end
