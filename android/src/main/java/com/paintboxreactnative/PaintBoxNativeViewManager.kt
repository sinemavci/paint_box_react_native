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

//  override fun getDelegate(): ViewManagerDelegate<PaintBoxNativeView>? {
//    return undefinedManagerDelegate(this as ViewManager)
//  }

//  override fun receiveCommand(view: PaintBoxNativeView, commandId: String?, args: ReadableArray?) {
//    Log.e("commandId", "command id: ${commandId}")
//    when (commandId) {
////      PaintBoxViewManagerDelegate.COMMAND_UNDO -> {
////        view.undo()
////      }
////      PaintBoxViewManagerDelegate.COMMAND_CLEAR -> {
////        view.clear()
////      }
//    }
//  }
  companion object {
    private const val REACT_CLASS = "PaintBoxView"
    private const val COMMAND_SET_VIEW_MODE = 1
  }
}
