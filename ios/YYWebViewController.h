//
//  YYWebViewController.h
//  MLLLight
//
//  Created by sihuan on 15/6/30.
//  Copyright (c) 2015年 com.meilele.iosapps.MLLLight. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface YYWebViewController : UIViewController

@property (nonatomic, strong) UIWebView *webView;
@property (nonatomic, strong, readonly) NSString *currentRequestUrl;

- (void)loadUrlStr:(NSString *)url;

//下拉刷新回调
- (void)updateUI;

- (void)needRefreshStatuseBarCheck:(NSString *)nextUrl;
+ (void)pushNewInstanceFromViewController:(UIViewController *)fromVc withUrlString:(NSString *)urlString title:(NSString *)title;

@end
