import UIKit
import React

#if RCT_NEW_ARCH_ENABLED
import ReactRuntime
#endif

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?
  var bridge: RCTBridge?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {

    let reactDelegate = ReactNativeDelegate()

    #if RCT_NEW_ARCH_ENABLED
    let fabricEnabled = true
    #else
    let fabricEnabled = false
    #endif

    bridge = RCTBridge(delegate: reactDelegate, launchOptions: launchOptions)
    let rootView = RCTRootView(
      bridge: bridge!,
      moduleName: "Allpay",
      initialProperties: nil
    )

    rootView.backgroundColor = .white
    window = UIWindow(frame: UIScreen.main.bounds)
    window?.rootViewController = UIViewController()
    window?.rootViewController?.view = rootView
    window?.makeKeyAndVisible()

    return true
  }

  func applicationWillResignActive(_ application: UIApplication) { }
  func applicationDidEnterBackground(_ application: UIApplication) { }
  func applicationWillEnterForeground(_ application: UIApplication) { }
  func applicationDidBecomeActive(_ application: UIApplication) { }
  func applicationWillTerminate(_ application: UIApplication) { }
}

#if RCT_NEW_ARCH_ENABLED
// Minimal delegate required when Fabric/TurboModules are on
@objc(ReactNativeDelegate)
class ReactNativeDelegate: NSObject, RCTBridgeDelegate {

  func sourceURL(for bridge: RCTBridge!) -> URL! {
    #if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }

  func extraModules(for bridge: RCTBridge!) -> [RCTBridgeModule]! {
    []
  }
}
#else
// Classic architecture
@objc(ReactNativeDelegate)
class ReactNativeDelegate: NSObject, RCTBridgeDelegate {

  func sourceURL(for bridge: RCTBridge!) -> URL! {
    #if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
#endif
