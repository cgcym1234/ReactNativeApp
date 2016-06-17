//
//  YYWebViewController.m
//  MLLLight
//
//  Created by sihuan on 15/6/30.
//  Copyright (c) 2015年 com.meilele.iosapps.MLLLight. All rights reserved.
//

#import "YYWebViewController.h"
#import "YYHud.h"

@interface YYWebViewController ()<UIWebViewDelegate>


@property (nonatomic, strong) NSString *currentRequestUrl;

@end

@implementation YYWebViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  [self.view addSubview:self.webView];
  self.webView.delegate = self;
  self.view.backgroundColor = [UIColor whiteColor];
  
  //    [self addRefreashView];
  if (self.currentRequestUrl) {
      [self loadUrlStr:_currentRequestUrl];
  }
}


- (void)dealloc {
  [YYHud dismiss];
}

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
  self.webView.frame = self.view.bounds;
  
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
}

-(void)viewWillDisappear:(BOOL)animated
{
  [super viewWillDisappear:animated];
}

- (UIWebView *)webView {
  if (!_webView) {
    UIWebView *webView = [[UIWebView alloc] init];
    webView.backgroundColor = [UIColor clearColor];
    _webView = webView;
  }
  return _webView;
}



#pragma mark - UIWebViewDelegate
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
  
  [YYHud showSpinner];
  NSString *urlStr = [request.URL absoluteString];
  NSLog(@"Load req:%@",urlStr);
  
  if ([request.URL.scheme isEqualToString:@"http"]) {
    self.currentRequestUrl = urlStr;
    [self needRefreshStatuseBarCheck:urlStr];
  }
  
  return YES;
}

- (void)webViewDidStartLoad:(UIWebView *)webView {
  NSLog(@"webViewDidStartLoad:%@",webView.request.URL.absoluteString);
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error {
  [YYHud dismiss];
  //    NSString *errorInfor = [error.userInfo objectForKey:NSLocalizedDescriptionKey];
  NSLog(@"didFailLoadWithError:%@",error);
  
  NSLog(@"didFailLoadWithError:%@",webView.request.URL.absoluteString);
}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
  [YYHud dismiss];
  NSString *urlStr = [webView.request.URL absoluteString];
  NSLog(@"webViewDidFinishLoad req:%@",urlStr);
  
  if ([webView.request.URL.scheme isEqualToString:@"http"]) {
    self.currentRequestUrl = urlStr;
  }
  
  
}

#pragma mark - Public
- (void)updateUI {
  
}

- (void)needRefreshStatuseBarCheck:(NSString *)nextUrl {
  
}

- (void)loadUrlStr:(NSString *)url {
  NSMutableURLRequest *req = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:url]];
  [_webView loadRequest:req];
}

+ (void)pushNewInstanceFromViewController:(UIViewController *)fromVc withUrlString:(NSString *)urlString title:(NSString *)title {
  YYWebViewController *webVc = [[YYWebViewController alloc] init];
  webVc.title = title;
  webVc.currentRequestUrl = urlString;
  [fromVc.navigationController pushViewController:webVc animated:YES];
}


@end
