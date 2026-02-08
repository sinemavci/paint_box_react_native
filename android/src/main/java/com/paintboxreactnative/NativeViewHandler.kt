package com.paintboxreactnative

import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerModule

object NativeViewHandler {
  fun resolve(
    reactContext: ReactContext,
    viewTag: Int,
    callback: (view: PaintBoxNativeView) -> Unit
  ) {
    val uiManager = reactContext.getNativeModule(UIManagerModule::class.java)
    uiManager?.addUIBlock { p0 ->
      val view = p0?.resolveView(viewTag)
      if (view is PaintBoxNativeView) {
        callback(view)
      }
    }
  }
}
