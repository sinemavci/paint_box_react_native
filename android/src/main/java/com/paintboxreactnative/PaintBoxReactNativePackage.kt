package com.paintboxreactnative

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import java.util.HashMap

class PaintBoxReactNativePackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return (if (name == PaintBoxReactNativeModule.NAME) {
      PaintBoxReactNativeModule(reactContext)
    } else {
      null
    }) as NativeModule?
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      moduleInfos[PaintBoxReactNativeModule.NAME] = ReactModuleInfo(
        PaintBoxReactNativeModule.NAME,
        PaintBoxReactNativeModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        true,  // isCxxModule
        false,
        true,// isTurboModule
      )
      moduleInfos
    }
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<in Nothing, in Nothing>> {
    return listOf(
      PaintBoxNativeViewManager(reactContext)
    )
  }
}
