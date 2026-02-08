//package com.paintboxreactnative
//
//import android.os.Build
//import androidx.annotation.RequiresApi
//import com.facebook.react.bridge.Promise
//import com.facebook.react.bridge.ReactApplicationContext
//import com.kotlin.native_drawing_plugin.MimeType
//import com.kotlin.native_drawing_plugin.PaintMode
//import com.google.gson.Gson
//import com.google.gson.GsonBuilder
//import com.paintboxreactnative.dto.ColorDTO
//import com.paintboxreactnative.PaintBoxNativeView
//
//class PaintBoxReactNativeModule(val reactContext: ReactApplicationContext) :
//  NativePaintBoxReactNativeSpec(reactContext) {
//  val converter: Gson = GsonBuilder()
//    .create()
//
//  @RequiresApi(Build.VERSION_CODES.VANILLA_ICE_CREAM)
//  override fun undo(viewTag: Double) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      {
//        paintBoxView.view.paintEditor.undo()
//      }
//    })
//  }
//
//  override fun redo(viewTag: Double) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      {
//        paintBoxView.view.paintEditor.redo()
//      }
//    })
//  }
//
//  override fun reset(viewTag: Double) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      {
//        paintBoxView.view.paintEditor.reset()
//      }
//    })
//  }
//
//  override fun importImage(
//    viewTag: Double,
//    path: String?,
//    width: Double?,
//    height: Double?
//  ) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      {
//        paintBoxView.view.paintEditor.import(path!!, width, height)
//      }
//    })
//  }
//
//  override fun export(path: String?, fileName: String?, mimeType: String?, viewTag: Double) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      {
//        paintBoxView.view.paintEditor.export(path!!, MimeType.fromValue(mimeType!!), fileName!!)
//      }
//    })
//  }
//
//  override fun isEnabled(viewTag: Double, promise: Promise) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      val isEnabled = paintBoxView.view.isEnabled
//      promise.resolve(isEnabled)
//    })
//  }
//
//  override fun setEnabled(value: Boolean, viewTag: Double) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      paintBoxView.view.paintEditor.setEnable(value)
//    })
//  }
//
//  override fun setPaintMode(paintMode: String?, viewTag: Double) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      paintBoxView.view.paintEditor.setPaintMode(PaintMode.valueOf(paintMode!!))
//    })
//  }
//
//  override fun getPaintMode(viewTag: Double, promise: Promise) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      val paintMode = paintBoxView.view.paintEditor.getPaintMode()
//      promise.resolve(paintMode.name)
//    })
//  }
//
//  @RequiresApi(Build.VERSION_CODES.O)
//  override fun setStrokeColor(strokeColor: String?, viewTag: Double) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      val color = converter.fromJson(strokeColor, ColorDTO::class.java).toDataModel()
//      paintBoxView.view.paintEditor.setStrokeColor(color)
//    })
//  }
//
//  @RequiresApi(Build.VERSION_CODES.O)
//  override fun getStrokeColor(viewTag: Double, promise: Promise) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      try {
//        val strokeColor = paintBoxView.view?.paintEditor?.getStrokeColor()
//        var strokeColorDTO: ColorDTO?
//        if (strokeColor != null) {
//          strokeColorDTO = ColorDTO.fromDataModel(strokeColor)
//          promise.resolve(converter.toJson(strokeColorDTO))
//        } else {
//          promise.reject(Throwable("color not found"))
//        }
//      } catch (error: Error) {
//        promise.reject(Throwable(error))
//      }
//    })
//  }
//
//  override fun setStrokeSize(size: Double, viewTag: Double) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      paintBoxView.view.paintEditor.setStrokeWidth(size)
//    })
//  }
//
//  override fun getStrokeSize(viewTag: Double, promise: Promise) {
//    NativeViewHandler.resolve(reactContext, viewTag.toInt(), { paintBoxView: PaintBoxNativeView ->
//      val size = paintBoxView.view.paintEditor.getStrokeWidth()
//      promise.resolve(size)
//    })
//  }
//
//  companion object {
//    const val NAME = NativePaintBoxReactNativeSpec.NAME
//  }
//}
