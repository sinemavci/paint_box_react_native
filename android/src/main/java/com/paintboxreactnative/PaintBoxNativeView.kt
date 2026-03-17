package com.paintboxreactnative

import android.annotation.SuppressLint
import android.util.Log
import android.widget.FrameLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.kotlin.native_drawing_plugin.PaintBoxView

class ViewAttachedEvent(surfaceId: Int, viewId: Int, val payload: WritableMap) : Event<ViewAttachedEvent>(surfaceId, viewId) {
  override fun getEventName(): String {
    return EVENT_NAME
  }

  override fun getEventData(): WritableMap {
    return payload
  }

  companion object {
    const val EVENT_NAME: String = "onPaintBoxReady"
  }
}

@SuppressLint("ViewConstructor")
class PaintBoxNativeView(context: ReactContext): FrameLayout(context) {
  val paintBox: PaintBoxView = PaintBoxView(context)
  private var hasDispatchedReady = false

  init {
    this.addView(paintBox)
  }

  fun dispatchEvent() {
    if (!hasDispatchedReady) {
      post {
        if (id == -1) {
          post { dispatchEvent() }
          return@post
        } else {
          val surfaceId = UIManagerHelper.getSurfaceId(context)
          val eventDispatcher =
            UIManagerHelper.getEventDispatcher(context as ReactContext, id)
          val payload = Arguments.createMap().apply {
            putBoolean("result", true)
          }
          val event = ViewAttachedEvent(surfaceId, id, payload)
          eventDispatcher?.dispatchEvent(event)
          hasDispatchedReady = true
        }
      }
    }
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    dispatchEvent()
  }
}
