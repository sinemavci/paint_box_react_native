package com.paintboxreactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.kotlin.native_drawing_plugin.MimeType
import com.paintboxreactnative.dto.ColorDTO

class PaintBoxReactNativeModule(val reactContext: ReactApplicationContext) :
  NativePaintBoxReactNativeSpec(reactContext) {
  val converter: Gson = GsonBuilder()
    .create()

  override fun export(viewTag: Double?, path: String?, fileName: String?, mimeType: String?, promise: Promise) {
    if (viewTag != null) {
      NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
        if (path != null && mimeType != null) {
          paintBoxView.paintBox.paintEditor.export(path, MimeType.fromValue(mimeType), fileName)
        } else {
          promise.reject(Throwable("Path or file Name is not valid"))
        }
      })
    }
  }

  override fun isEnable(viewTag: Double?, promise: Promise) {
    if(viewTag != null) {
      NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
        val isEnabled = paintBoxView.paintBox.isEnabled
        promise.resolve(isEnabled)
      })
    }
  }


  override fun getPaintMode(viewTag: Double?, promise: Promise) {
    if(viewTag != null) {
      NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
        val paintMode = paintBoxView.paintBox.paintEditor.getPaintMode()
        promise.resolve(paintMode.name)
      })
    }
  }

  override fun getStrokeColor(viewTag: Double?, promise: Promise) {
    if (viewTag != null) {
      NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
        try {
          val strokeColor = paintBoxView.paintBox.paintEditor.getStrokeColor()
          var strokeColorDTO: ColorDTO?
          strokeColorDTO = ColorDTO.fromDataModel(strokeColor)
          promise.resolve(converter.toJson(strokeColorDTO))
        } catch (error: Error) {
          promise.reject(Throwable(error))
        }
      })
    }
  }

  override fun getStrokeSize(viewTag: Double?, promise: Promise) {
    if (viewTag != null) {
      NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
        val size = paintBoxView.paintBox.paintEditor.getStrokeWidth()
        promise.resolve(size)
      })
    }
  }

  companion object {
    const val NAME = NativePaintBoxReactNativeSpec.NAME
  }
}
