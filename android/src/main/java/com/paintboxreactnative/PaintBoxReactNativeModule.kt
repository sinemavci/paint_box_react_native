package com.paintboxreactnative

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
