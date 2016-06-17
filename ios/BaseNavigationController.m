//
//  BaseNavigationController.m
//  AwesomeProject
//
//  Created by sihuan on 15/12/7.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "BaseNavigationController.h"

@interface BaseNavigationController ()

@end

@implementation BaseNavigationController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated {
  
  if (self.viewControllers.count > 0) {
      viewController.hidesBottomBarWhenPushed = YES;
  }
  [super pushViewController:viewController animated:animated];
}

@end
