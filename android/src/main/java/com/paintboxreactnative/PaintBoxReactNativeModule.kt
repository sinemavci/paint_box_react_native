package com.paintboxreactnative

import com.kotlin.native_drawing_plugin.PaintBoxView
import com.facebook.react.bridge.ReactApplicationContext

class PaintBoxReactNativeModule(reactContext: ReactApplicationContext) :
  NativePaintBoxReactNativeSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativePaintBoxReactNativeSpec.NAME
  }
}
