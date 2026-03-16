package com.paintboxreactnative

import android.graphics.Color
import android.os.Build
import android.util.Log
import android.widget.FrameLayout
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.StateWrapper
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.PaintBoxViewManagerDelegate
import com.facebook.react.viewmanagers.PaintBoxViewManagerInterface
import com.google.gson.Gson
import com.kotlin.native_drawing_plugin.PaintMode
import com.paintboxreactnative.dto.ColorDTO

class PaintBoxNativeViewManager(private val callerContext: ReactApplicationContext) :
  SimpleViewManager<PaintBoxNativeView>(), PaintBoxViewManagerInterface<PaintBoxNativeView> {

  override fun getName() = REACT_CLASS

  override fun createViewInstance(context: ThemedReactContext): PaintBoxNativeView {
    return PaintBoxNativeView(context).apply {
      isClickable = true
      isFocusable = true
      setBackgroundColor(Color.RED)
      layoutParams = FrameLayout.LayoutParams(
        FrameLayout.LayoutParams.MATCH_PARENT,
        FrameLayout.LayoutParams.MATCH_PARENT
      )
    }
  }

  override fun createViewInstance(
    reactTag: Int,
    reactContext: ThemedReactContext,
    initialProps: ReactStylesDiffMap?,
    stateWrapper: StateWrapper?
  ): PaintBoxNativeView {

    return PaintBoxNativeView(reactContext).apply {
      isClickable = true
      isFocusable = true
      setBackgroundColor(Color.RED)
      layoutParams = FrameLayout.LayoutParams(
        FrameLayout.LayoutParams.MATCH_PARENT,
        FrameLayout.LayoutParams.MATCH_PARENT
      )
    }
  }

  override fun getCommandsMap() = mapOf(
    "setViewMode" to COMMAND_SET_VIEW_MODE,
  )

  override fun getDelegate(): ViewManagerDelegate<PaintBoxNativeView> {
    return PaintBoxViewManagerDelegate(this)
  }

  @RequiresApi(Build.VERSION_CODES.VANILLA_ICE_CREAM)
  override fun undo(view: PaintBoxNativeView?) {
    view?.paintBox?.paintEditor?.undo()
  }

  override fun redo(view: PaintBoxNativeView?) {
    view?.paintBox?.paintEditor?.redo()
  }

  override fun reset(view: PaintBoxNativeView?) {
    view?.paintBox?.paintEditor?.reset()
  }

  override fun importImage(
    view: PaintBoxNativeView?,
    path: String?,
    width: Double,
    height: Double
  ) {
    if (path != null) {
      Log.e("import image path exist", "import image path exist: ${path}")
      val _width = if (width != -1.0) {
        width
      } else {
        null
      }
      val _height = if (height != -1.0) {
        height
      } else {
        null
      }
      Log.e("import image path exist", "import image path exist: ${_width} ${_height}")
      view?.paintBox?.paintEditor?.import(path, _width, _height)
    }
  }

  override fun setEnable(view: PaintBoxNativeView, enable: Boolean) {
    view.paintBox.paintEditor.setEnable(enable)
  }


  override fun setPaintMode(view: PaintBoxNativeView?, paintMode: String?) {
    if(paintMode != null) {
      view?.paintBox?.paintEditor?.setPaintMode(PaintMode.valueOf(paintMode))
    }
  }

  override fun setStrokeColor(view: PaintBoxNativeView?, color: String?) {
    if (color != null) {
      val colorDTO = Gson().fromJson(color, ColorDTO::class.java)
      val _color = colorDTO.toDataModel()
      Log.e("color: ", "setStrokeColor: ${_color.alpha()}")
      view?.paintBox?.paintEditor?.setStrokeColor(_color)
    }
  }

  override fun setStrokeSize(view: PaintBoxNativeView?, size: Double) {
    view?.paintBox?.paintEditor?.setStrokeWidth(size)
  }

  companion object {
    private const val REACT_CLASS = "PaintBoxView"
    private const val COMMAND_SET_VIEW_MODE = 1
  }
}
