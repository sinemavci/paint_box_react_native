package com.paintboxreactnative

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.common.UIManagerType

object NativeViewHandler {
  fun resolve(
    reactContext: ReactContext,
    viewTag: Int,
    callback: (view: PaintBoxNativeView) -> Unit
  ) {
    UiThreadUtil.runOnUiThread {

      val uiManager = UIManagerHelper.getUIManager(
        reactContext,
        UIManagerType.FABRIC
      )

      val paintBoxView: PaintBoxNativeView = uiManager?.resolveView(viewTag) as PaintBoxNativeView
      callback(paintBoxView)
    }
  }
}
