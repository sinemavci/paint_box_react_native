package com.paintboxreactnative.dto

import android.annotation.TargetApi
import android.graphics.Color
import android.os.Build
import androidx.annotation.RequiresApi

data class ColorDTO(
  val red: Double,
  val green: Double,
  val blue: Double,
  val alpha: Double = 255.0,
) {
  companion object {
    @TargetApi(Build.VERSION_CODES.O)
    @RequiresApi(Build.VERSION_CODES.O)
    fun fromDataModel(color: Color): ColorDTO {
      return ColorDTO(
        red = color.red().toDouble(),
        green = color.green().toDouble(),
        blue = color.blue().toDouble(),
        alpha = color.alpha().toDouble()
      )
    }
  }

  @TargetApi(Build.VERSION_CODES.O)
  @RequiresApi(Build.VERSION_CODES.O)
  fun toDataModel(): Color {
    return Color.valueOf(
      (red / 255.0).toFloat(),
      (green / 255.0).toFloat(),
      (blue.toFloat() / 255.0).toFloat(),
      (alpha.toFloat() / 255.0).toFloat(),
    )
  }
}
